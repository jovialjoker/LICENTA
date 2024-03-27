export interface ISplitListItem {
  description: string;
  name: string;
  splitId: string;
  workoutsNo: number;
  isCurrentSplit: boolean;
}

export interface IGoal {
  name: string;
  currentValue: number;
  targetValue: number;
  percent: number;
}

export interface IWorkout {
  workoutId: string;
  name: string;
  exercises: IExercise[];
}

export interface IExercise {
  exerciseId: string;
  name: string;
}

export interface IUnfinishedWorkout {
  workoutId: string;
  date: string;
  name: string;
  exercises: IUnfinishedExercise[];
}

export interface IUnfinishedExercise {
  exerciseId: string;
  name: string;
  setsRecorded: number;
}
