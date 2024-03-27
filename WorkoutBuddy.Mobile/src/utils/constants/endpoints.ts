export const endpoints = {
    User:{
        Login: "UserAccount/login",
    },
    UserSplit: {
        GetCurrentSplit: "UserSplit/GetCurrentSplit",
        GetSplits: "UserSplit/ListOfSplits",
        ChangeCurrentSplit: "UserSplit/ChangeCurrentSplit",
        GetWorkoutsForProgress: "UserSplit/GetWorkoutsForProgress",
        GetUnfinishedWorkouts: "UserSplit/GetUnfinishedWorkouts",
    }
}