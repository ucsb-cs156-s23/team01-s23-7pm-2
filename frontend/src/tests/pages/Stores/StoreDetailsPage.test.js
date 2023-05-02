import { render, screen } from "@testing-library/react";
import StoreDetailsPage from "main/pages/Stores/StoreDetailsPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 3
    }),
    useNavigate: () => mockNavigate
}));

jest.mock('main/utils/storeUtils', () => {
    return {
        __esModule: true,
        storeUtils: {
            getById: (_id) => {
                return {
                    store: {
                        id: 3,
                        name: "Home Depot",
                        location: "6975 Market Pl Dr",
                        sales: "High"
                    }
                }
            }
        }
    }
});

describe("StoreDetailsPage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <StoreDetailsPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("loads the correct fields, and no buttons", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <StoreDetailsPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        expect(screen.getByText("Home Depot")).toBeInTheDocument();
        expect(screen.getByText("6975 Market Pl Dr")).toBeInTheDocument();
        expect(screen.getByText("High")).toBeInTheDocument();

        expect(screen.queryByText("Delete")).not.toBeInTheDocument();
        expect(screen.queryByText("Edit")).not.toBeInTheDocument();
        expect(screen.queryByText("Details")).not.toBeInTheDocument();
    });

});


