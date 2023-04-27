import { render, screen, waitFor } from "@testing-library/react";
import StoreIndexPage from "main/pages/Stores/StoreIndexPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

const mockDelete = jest.fn();
jest.mock('main/utils/storeUtils', () => {
    return {
        __esModule: true,
        storeUtils: {
            del: (id) => {
                return mockDelete(id);
            },
            get: () => {
                return {
                    nextId: 5,
                    stores: [
                        {
                            "id": 3,
                            "name": "Home Depot",
                            "location": "6975 Market Pl Dr",
                            "price":  "$$$",
                            "sales": "High"
                        },
                    ]
                }
            }
        }
    }
});


describe("StoreIndexPage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <StoreIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("renders correct fields", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <StoreIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const createStoreButton = screen.getByText("Create Store");
        expect(createStoreButton).toBeInTheDocument();
        expect(createStoreButton).toHaveAttribute("style", "float: right;");

        const name = screen.getByText("Home Depot");
        expect(name).toBeInTheDocument();

        const location = screen.getByText("6975 Market Pl Dr");
        expect(location).toBeInTheDocument();

        expect(screen.getByTestId("StoreTable-cell-row-0-col-Delete-button")).toBeInTheDocument();
        expect(screen.getByTestId("StoreTable-cell-row-0-col-Details-button")).toBeInTheDocument();
        expect(screen.getByTestId("StoreTable-cell-row-0-col-Edit-button")).toBeInTheDocument();
    });

    test("delete button calls delete and reloads page", async () => {

        const restoreConsole = mockConsole();

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <StoreIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const name = screen.getByText("Home Depot");
        expect(name).toBeInTheDocument();

        const location = screen.getByText("6975 Market Pl Dr");
        expect(location).toBeInTheDocument();

        const deleteButton = screen.getByTestId("StoreTable-cell-row-0-col-Delete-button");
        expect(deleteButton).toBeInTheDocument();

        deleteButton.click();

        expect(mockDelete).toHaveBeenCalledTimes(1);
        expect(mockDelete).toHaveBeenCalledWith(3);

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/stores"));


        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage = `StoreIndexPage deleteCallback: {"id":3,"name":"Home Depot","location":"6975 Market Pl Dr"}`;
        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


