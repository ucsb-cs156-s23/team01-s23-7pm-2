import { render, screen, act, waitFor, fireEvent } from "@testing-library/react";
import StoreEditPage from "main/pages/Stores/StoreEditPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 3
    }),
    useNavigate: () => mockNavigate
}));

const mockUpdate = jest.fn();
jest.mock('main/utils/storeUtils', () => {
    return {
        __esModule: true,
        storeUtils: {
            update: (_store) => {return mockUpdate();},
            getById: (_id) => {
                return {
                    store: {
                        id: 3,
                        name: "Freebirds",
                        description: "Burritos"
                    }
                }
            }
        }
    }
});


describe("StoreEditPage tests", () => {

    const queryClient = new QueryClient();

    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <StoreEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("loads the correct fields", async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <StoreEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("StoreForm-name")).toBeInTheDocument();
        expect(screen.getByDisplayValue('Freebirds')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Burritos')).toBeInTheDocument();
    });

    test("redirects to /stores on submit", async () => {

        const restoreConsole = mockConsole();

        mockUpdate.mockReturnValue({
            "store": {
                id: 3,
                name: "South Coast Deli (Goleta)",
                description: "Sandwiches, Salads and more"
            }
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <StoreEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        const nameInput = screen.getByLabelText("Name");
        expect(nameInput).toBeInTheDocument();


        const descriptionInput = screen.getByLabelText("Description");
        expect(descriptionInput).toBeInTheDocument();

        const updateButton = screen.getByText("Update");
        expect(updateButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(nameInput, { target: { value: 'South Coast Deli (Goleta)' } })
            fireEvent.change(descriptionInput, { target: { value: 'Sandwiches, Salads and more' } })
            fireEvent.click(updateButton);
        });

        await waitFor(() => expect(mockUpdate).toHaveBeenCalled());
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/stores"));

        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage =  `updatedStore: {"store":{"id":3,"name":"South Coast Deli (Goleta)","description":"Sandwiches, Salads and more"}`

        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


