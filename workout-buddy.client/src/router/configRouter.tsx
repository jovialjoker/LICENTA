import { createBrowserRouter } from "react-router-dom";
import GeneralLayout from "../core/layouts/GeneralLayout";
import Login from "../core/pages/account/Login";
import Register from "../core/pages/account/Register";
import PrivateRoute from "../core/components/PrivateRoute";
import MainPage from "../core/pages/home/MainPage";
import ExercisesLayout from "../core/pages/exercises/ExerciseLayout";
import ExercisesList from "../core/pages/exercises/ExercisesList";
import InsertExercise from "../core/pages/exercises/InsertExercise";
import ViewExercise from "../core/pages/exercises/ViewExercise";
import InsertSplit from "../core/pages/splits/InsertSpit";
import ViewSplit from "../core/pages/splits/ViewSplit";
import CalorieCalculator from "../core/pages/calorieCalculator/CalorieCalculator";
import UserEdit from "../core/pages/user/UserEdit";
import PendingExercises from "../core/pages/admin/PendingExercises";
import UsersList from "../core/pages/admin/UsersList";
import UserSplitsList from "../core/pages/myCollection/UserSplitsList";
import ViewUserSplit from "../core/pages/myCollection/ViewUserSplit";
import AddProgress from "../core/pages/myCollection/AddProgress";
import ViewExerciseProgress from "../core/pages/myCollection/ViewExerciseProgress";
import { lazy } from "react";

const SplitsWrapper = lazy(() => import("../core/pages/splits/SplitsWrapper"));

export default function configRouter(opts?: string) {
  return createBrowserRouter([
    {
      path: "/",
      element: <GeneralLayout />,
      children: [
        {
          path: "/",
          element: <MainPage />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "exercises",
          element: (
            <PrivateRoute>
              <ExercisesLayout />
            </PrivateRoute>
          ),
          children: [
            {
              path: "/exercises",
              element: (
                <PrivateRoute>
                  <ExercisesList />
                </PrivateRoute>
              ),
            },
            {
              path: "/exercises/insert-exercise",
              element: (
                <PrivateRoute>
                  <InsertExercise />
                </PrivateRoute>
              ),
            },
            {
              path: "/exercises/:id",
              element: (
                <PrivateRoute>
                  <ViewExercise />
                </PrivateRoute>
              ),
            },
          ],
        },
        {
          path: "splits",
          element: (
            <PrivateRoute>
              <ExercisesLayout />
            </PrivateRoute>
          ),
          children: [
            {
              path: "/splits",
              element: (
                <PrivateRoute>
                  <SplitsWrapper />
                </PrivateRoute>
              ),
            },
            {
              path: "/splits/insert-split",
              element: (
                <PrivateRoute>
                  <InsertSplit />
                </PrivateRoute>
              ),
            },
            {
              path: "/splits/:id",
              element: (
                <PrivateRoute>
                  <ViewSplit />
                </PrivateRoute>
              ),
            },
          ],
        },
        {
          path: "calorie-calculator",
          element: <CalorieCalculator />,
        },
        {
          path: "my-collection",
          element: (
            <PrivateRoute>
              <ExercisesLayout />
            </PrivateRoute>
          ),
          children: [
            {
              path: "/my-collection",
              element: (
                <PrivateRoute>
                  <UserSplitsList />
                </PrivateRoute>
              ),
            },
            {
              path: "/my-collection/view-split/:id",
              element: (
                <PrivateRoute>
                  <ViewUserSplit />
                </PrivateRoute>
              ),
            },
            {
              path: "/my-collection/view-exercise-progress/:id",
              element: (
                <PrivateRoute>
                  <ViewExerciseProgress />
                </PrivateRoute>
              ),
            },
            {
              path: "/my-collection/add-progress/:id",
              element: (
                <PrivateRoute>
                  <AddProgress />
                </PrivateRoute>
              ),
            },
          ],
        },
        {
          path: "user-edit",
          element: (
            <PrivateRoute>
              <UserEdit />
            </PrivateRoute>
          ),
        },
        {
          path: "pending-exercises",
          element: (
            <PrivateRoute>
              <PendingExercises />
            </PrivateRoute>
          ),
        },
        {
          path: "users-list",
          element: (
            <PrivateRoute>
              <UsersList />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);
}
