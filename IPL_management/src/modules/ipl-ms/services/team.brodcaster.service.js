import ApiError from "../../../common/utils/api-error";
import Team from "../models/team.model.js";
import TeamBroadcaster from "../models/team-broadcaster.model.js"


const assignBroadcaster = async ({teamId, broadcasterId}) => {
    const team = await Team.findById(teamId);
    if(!team){
        throw ApiError.notfound("Team not found");
    }

    const broadcaster = await Broadcaster.findById(broadcaster)
}