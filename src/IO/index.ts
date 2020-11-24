export const IOHandler = {
    bodyJSON: data => JSON.parse(data.body),

    returnSuccess: data => ({
        statusCode: 200,
        body: JSON.stringify(data, null, 2),
    }),

    returnError400: data => ({
        statusCode: 400,
        body: JSON.stringify(data, null, 2),
    }),
}

export const IOLocationErrorMessages = {
    missingItemMessage: () => "ERROR request does not include all required paramaters. Try '/location/help' to see requirements",
    paramaterHasWrongTypeMessage: () => "ERROR a paramater provided is of wrong type. Try '/location/help' to see requirements",
    invalidCapacityMessage: () => "ERROR more items are in location than the capacity is allowed -> currentAmountOfCapacityUsed > totalAvailableCapacity"
}