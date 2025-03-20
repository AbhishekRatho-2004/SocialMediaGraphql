const User = require("../models/User")

const getUserResolver = async () => {
    return await User.find();
}
 const getUserByIdResolver = async (_, { id }) => {
    return await User.findById(id);
}
const getFollowingUsers = async (parent)=>{
  return await User.find({ following: parent._id });

}
const getFollowedUser = async (parent)=>{
  return await User.find({ followers: parent._id });
}


//mutations
const addUserResolver = async (_, { username, email,password }) => {
    try {
        if (!username || !email) {
            return {
                message:"Mandatory to mention both the username and password"
            }
          }
      const existingUser = await User.findOne({
        $or: [{ username }, { email }]
      });

      if (existingUser) {
        return{
            message:"User Already Exists"
        };
      }

      const newUser = new User({ username, email,password });
      const savedUser = await newUser.save(); // Save to DB

      return {
        id: savedUser._id.toString(), 
        username: savedUser.username,
        email: savedUser.email
      };
    } catch (error) {
      return {
        error: error.message
      }
    }
  }

const followUserResolver = async(parent,args)=>{
    try {
      const {currentUserId,targetUserId}=args
      if(!currentUserId|| !targetUserId){
          return "Mandatory to mention both the current user and target user"
      }

      const currentuser = await User.findById(currentUserId)
      const targetuser = await User.findById(targetUserId)
      if(!currentuser||!targetuser){
          return "User not Found"
      }
      if(currentUserId===targetUserId){
        return "You can't follow yourself"
      }

      if(currentuser.following.includes(targetUserId)){
        return "You are already following this user"
      }
      currentuser.following=targetUserId
      await currentuser.save()
      targetuser.followers = currentUserId
      await targetuser.save()

      return "Followed Successfully"
    } catch (error) {
      return "User doesnot Exist"
    }

}

const unfollowUserResolver = async (_,args)=>{
    try {
      const {currentUserId,targetUserId}=args
      if(!currentUserId|| !targetUserId){
        return "Mandatory to mention both the current user and target user"
      }
      const currentUser = await User.findById(currentUserId)
      if(!currentUser){
        return "User not Found"
      }
      const targetUser = await User.findById(targetUserId)
      if(!targetUser){
        return "User not Found"
      }
      if(currentUserId===targetUserId){
        return "You can't unfollow yourself"
      }
      if(!currentUser.following.includes(targetUserId)){
        return "You are not following this user"
      }

      const index = currentUser.following.indexOf(targetUserId)
      currentUser.following.splice(index,1)
      await currentUser.save()
      const index2 = targetUser.followers.indexOf(currentUserId)
      targetUser.followers.splice(index2,1)
      await targetUser.save()

      return "You successfully unfollowed the user"
      
    } catch (error) {
      
    }
}
module.exports = {
    getUserResolver,
    getUserByIdResolver,
    addUserResolver,
    getFollowedUser,
    getFollowingUsers,
    followUserResolver,
    unfollowUserResolver
   
}