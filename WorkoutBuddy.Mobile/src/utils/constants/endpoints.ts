export const endpoints = {
  User: {
    Login: "UserAccount/login",
    GetCurrentWeight: "UserAccount/getCurrentWeight",
  },
  UserSplit: {
    GetCurrentSplit: "UserSplit/GetCurrentSplit",
    GetSplits: "UserSplit/ListOfSplits",
    ChangeCurrentSplit: "UserSplit/ChangeCurrentSplit",
    GetWorkoutsForProgress: "UserSplit/GetWorkoutsForProgress",
    GetUnfinishedWorkouts: "UserSplit/GetUnfinishedWorkouts",
    GetUnfinishedProgressForWorkout:
      "UserSplit/GetUnfinishedProgressForWorkout",
    AddProgress: "UserSplit/AddProgress",
    GetNoOfPrsInThisWeek: "UserSplit/GetNoOfPrsInThisWeek",
    GetNoOfWorkoutsInThisWeek: "UserSplit/GetNoOfWorkoutsInThisWeek",
  },
};
