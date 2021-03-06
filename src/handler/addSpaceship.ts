import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import service from '../Services/index';
import io from '../IO/index';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
    //gets the body of the event as a JSON object
    const spaceshipData = io.handler.bodyJSON(event);

    //error checking to ensure the passes paramaters are correct
    const errorResult: {statusCode: number, body: string} = errorChecking(spaceshipData);

    if(errorResult.statusCode != 200){
        return errorResult;
    }

    //create an object that only has the needed values -> errorChecking() made sure they exists
    const spaceshipToAdd: {id: string, name: string, model: string, locationID: string, status: string} = {
        id: spaceshipData.id,
        name: spaceshipData.name,
        model: spaceshipData.model,
        locationID: spaceshipData.locationID,
        status: spaceshipData.status
    }

    //sends the location off to be be delt with -> returns an a message to be sent to the client
    const result = await service.addSpaceship(io, spaceshipToAdd);
    return io.handler.returnSuccess(result);
}

const errorChecking = (spaceshipData: {[key: string]: any}): {statusCode: number, body: string} => {
    //Make sure each element needed was included in request
    if(!spaceshipData.id || !spaceshipData.name || !spaceshipData.model || !spaceshipData.locationID || !spaceshipData.status){
        return io.handler.returnError400(io.IOErrorMessages.missingItemMessage);
    }

    //type gard to ensure that each paramater is of correct type
    let result:{statusCode: number, body: string} = io.handler.stringErrorChecking(spaceshipData.id);
    if(result.statusCode != 200) return result;

    result = io.handler.stringErrorChecking(spaceshipData.name);
    if(result.statusCode != 200) return result;

    result = io.handler.stringErrorChecking(spaceshipData.model);
    if(result.statusCode != 200) return result;

    result = io.handler.stringErrorChecking(spaceshipData.locationID);
    if(result.statusCode != 200) return result;

    result = io.handler.stringErrorChecking(spaceshipData.status);
    if(result.statusCode != 200) return result;

    //Make sure that status is only of type [DECOMMISSIONED | MAINTENANCE | OPERATIONAL]
    if(spaceshipData.status != io.spaceshipStatusValues.decommissioned && spaceshipData.status != io.spaceshipStatusValues.maintenance
         && spaceshipData.status != io.spaceshipStatusValues.operational){
        return io.handler.returnError400(io.IOErrorMessages.spaceshipStatusInvalidValue);
    }

    return io.handler.returnSuccess('');//use as a dummy response to signify no errors
}