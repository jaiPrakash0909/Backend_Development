
import ApiError from "../../../common/utils/api-error"
import Team from "../models/team.model.js"
import Player from "../models/player.model.js"
// CREATE, READ, UPDATE, DELETE

const transferPlayer = async(playerId, newTeamId)=>{
    const team = await Team.findById(newTeamId)

    if(!team){
        throw ApiError.notfound("Team not found")
    };

    const player = await player.findByIdAndUpdate(
        playerId,
        {teamId:newTeamId},
        {new:true, runValidators:true}
    ).populate("teamId", "name")

    if(!player){
        throw ApiError.notfound("Player not found")
    }

    return player;
}