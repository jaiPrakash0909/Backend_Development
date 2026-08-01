import ApiError from "../../../common/utils/api-error";
import Team from "../models/team.model.js";
import TeamBroadcaster from "../models/team-broadcaster.model.js"
import ApiResponse from "../../../common/utils/api-response.js";


const assignBroadcaster = async ({teamId, broadcasterId}) => {
    const team = await Team.findById(teamId);
    if(!team){
        throw ApiError.notfound("Team not found");
    }

    const broadcaster = await Broadcaster.findById(broadcaster)
    if(!broadcaster){
        throw ApiError.notfound("Broadcaster not found");
    }

    const existing = await TeamBroadcaster.findOne({ teamId, broadcasterId });
    if(existing){
        throw ApiError.conflict("Broadcaster already assigned to this team");
    }

    const teamBroadcaster = await TeamBroadcaster.create({teamId, broadcasterId});
    return teamBroadcaster;

}