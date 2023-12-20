import * as createPlace from "./createPlace.controller";
import * as getPlace from "./getPlace.controller";
import * as getOnePlace from "./getOnePlace.controller";
import * as reviewStars from "./reviewStars.controller";
import * as editPlace from "./editPlace.controller";
import * as deletePlace from "./deletePlace.controller";
import * as getTags from "./getTags.controller";
import * as getAllPlaces from "./getAllPlaces.controller";
import * as getAllPlacesByUser from "./getAllPlacesByUser.controller";

export const placeController = {
    ...createPlace,
    ...getPlace,
    ...getOnePlace,
    ...reviewStars,
    ...editPlace,
    ...deletePlace,
    ...getTags,
    ...getAllPlaces,
    ...getAllPlacesByUser
}