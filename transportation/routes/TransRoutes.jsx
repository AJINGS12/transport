import BookingPage from "../pages/BookingPage";
import ChooseDestinationPage from "../pages/ChooseDestinationPage";
import HomePage from "../pages/HomePage";

export default function TransRoutes() {
  return [
    {
      path: "home",
      element: <HomePage />,
    },
    {
      path: "destination",
      element: <ChooseDestinationPage />,
    },
    {
      path: "booking",
      element: <BookingPage/>,
    }

  ];
}
