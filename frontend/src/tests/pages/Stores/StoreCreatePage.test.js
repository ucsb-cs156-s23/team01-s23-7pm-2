import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import StoreCreatePage from "main/pages/Stores/StoreCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

const mockAdd = jest.fn();
jest.mock('main/utils/storeUtils', () => {
    return {
        __esModule: true,
        storeUtils: {
            add: () => { return mockAdd(); }
        }
    }
});

describe("StoreCreatePage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <StoreCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("redirects to /stores on submit", async () => {

        const restoreConsole = mockConsole();

        mockAdd.mockReturnValue({
            "store": {
                id: 3,
                name: "South Coast Deli",
                location: "Sandwiches and Salads"
            }
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <StoreCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        const nameInput = screen.getByLabelText("Name");
        expect(nameInput).toBeInTheDocument();


        const locationInput = screen.getByLabelText("Location");
        expect(locationInput).toBeInTheDocument();

        const createButton = screen.getByText("Create");
        expect(createButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(nameInput, { target: { value: 'South Coast Deli' } })
            fireEvent.change(locationInput, { target: { value: 'Sandwiches and Salads' } })
            fireEvent.click(createButton);
        });

        await waitFor(() => expect(mockAdd).toHaveBeenCalled());
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/stores"));

        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage =  `createdStore: {"store":{"id":3,"name":"South Coast Deli","location":"Sandwiches and Salads"}`

        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


