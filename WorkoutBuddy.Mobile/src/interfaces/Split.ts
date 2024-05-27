export interface ISplitListItem {
  description: string;
  name: string;
  splitId: string;
  workoutsNo: number;
  isCurrentSplit: boolean;
}

export interface IGoal {
  name: string;
  value: number;
  target: number;
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

export interface IFormSet {
  id: string;
  reps: number | null;
  weight: number | null;
  duration: number | null;
  distance: number | null;
}

export interface IUserExerciseSet {
  reps: number | null;
  weight: number | null;
  duration: number | null;
  distance: number | null;
}

export interface IUserExerciseModel {
  exerciseId: string;
  exerciseName: string;
  exerciseType: number;
  sets: IUserExerciseSet[];
  setsNo: number;
}

export interface IUserWorkoutModel {
  userId: string;
  date: string;
  splitId: string;
  workoutId: string;
  exercises: IUserExerciseModel[];
}
