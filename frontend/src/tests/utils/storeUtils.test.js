import { storeFixtures } from "fixtures/storeFixtures";
import { storeUtils } from "main/utils/storeUtils";

describe("storeUtils tests", () => {
    // return a function that can be used as a mock implementation of getItem
    // the value passed in will be convertd to JSON and returned as the value
    // for the key "stores".  Any other key results in an error
    const createGetItemMock = (returnValue) => (key) => {
        if (key === "stores") {
            return JSON.stringify(returnValue);
        } else {
            throw new Error("Unexpected key: " + key);
        }
    };

    describe("get", () => {

        test("When stores is undefined in local storage, should set to empty list", () => {

            // arrange
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(undefined));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = storeUtils.get();

            // assert
            const expected = { nextId: 1, stores: [] } ;
            expect(result).toEqual(expected);

            const expectedJSON = JSON.stringify(expected);
            expect(setItemSpy).toHaveBeenCalledWith("stores", expectedJSON);
        });

        test("When stores is null in local storage, should set to empty list", () => {

            // arrange
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(null));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = storeUtils.get();

            // assert
            const expected = { nextId: 1, stores: [] } ;
            expect(result).toEqual(expected);

            const expectedJSON = JSON.stringify(expected);
            expect(setItemSpy).toHaveBeenCalledWith("stores", expectedJSON);
        });

        test("When stores is [] in local storage, should return []", () => {

            // arrange
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 1, stores: [] }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = storeUtils.get();

            // assert
            const expected = { nextId: 1, stores: [] };
            expect(result).toEqual(expected);

            expect(setItemSpy).not.toHaveBeenCalled();
        });

        test("When stores is JSON of three stores, should return that JSON", () => {

            // arrange
            const threeStores = storeFixtures.threeStores;
            const mockStoreCollection = { nextId: 10, stores: threeStores };

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(mockStoreCollection));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = storeUtils.get();

            // assert
            expect(result).toEqual(mockStoreCollection);
            expect(setItemSpy).not.toHaveBeenCalled();
        });
    });


    describe("getById", () => {
        test("Check that getting a store by id works", () => {

            // arrange
            const threeStores = storeFixtures.threeStores;
            const idToGet = threeStores[1].id;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, stores: threeStores }));

            // act
            const result = storeUtils.getById(idToGet);

            // assert

            const expected = { store: threeStores[1] };
            expect(result).toEqual(expected);
        });

        test("Check that getting a non-existing store returns an error", () => {

            // arrange
            const threeStores = storeFixtures.threeStores;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, stores: threeStores }));

            // act
            const result = storeUtils.getById(99);

            // assert
            const expectedError = `store with id 99 not found`
            expect(result).toEqual({ error: expectedError });
        });

        test("Check that an error is returned when id not passed", () => {

            // arrange
            const threeStores = storeFixtures.threeStores;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, stores: threeStores }));

            // act
            const result = storeUtils.getById();

            // assert
            const expectedError = `id is a required parameter`
            expect(result).toEqual({ error: expectedError });
        });

    });
    describe("add", () => {
        test("Starting from [], check that adding one store works", () => {

            // arrange
            const store = storeFixtures.oneStore[0];
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 1, stores: [] }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = storeUtils.add(store);

            // assert
            expect(result).toEqual(store);
            expect(setItemSpy).toHaveBeenCalledWith("stores",
                JSON.stringify({ nextId: 2, stores: storeFixtures.oneStore }));
        });
    });

    describe("update", () => {
        test("Check that updating an existing store works", () => {

            // arrange
            const threeStores = storeFixtures.threeStores;
            const updatedStore = {
                ...threeStores[0],
                name: "Updated Name"
            };
            const threeStoresUpdated = [
                updatedStore,
                threeStores[1],
                threeStores[2]
            ];

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, stores: threeStores }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = storeUtils.update(updatedStore);

            // assert
            const expected = { storeCollection: { nextId: 5, stores: threeStoresUpdated } };
            expect(result).toEqual(expected);
            expect(setItemSpy).toHaveBeenCalledWith("stores", JSON.stringify(expected.storeCollection));
        });
        test("Check that updating an non-existing store returns an error", () => {

            // arrange
            const threeStores = storeFixtures.threeStores;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, stores: threeStores }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            const updatedStore = {
                id: 99,
                name: "Fake Name",
                description: "Fake Description"
            }

            // act
            const result = storeUtils.update(updatedStore);

            // assert
            const expectedError = `store with id 99 not found`
            expect(result).toEqual({ error: expectedError });
            expect(setItemSpy).not.toHaveBeenCalled();
        });
    });

    describe("del", () => {
        test("Check that deleting a store by id works", () => {

            // arrange
            const threeStores = storeFixtures.threeStores;
            const idToDelete = threeStores[1].id;
            const threeStoresUpdated = [
                threeStores[0],
                threeStores[2]
            ];

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, stores: threeStores }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = storeUtils.del(idToDelete);

            // assert

            const expected = { storeCollection: { nextId: 5, stores: threeStoresUpdated } };
            expect(result).toEqual(expected);
            expect(setItemSpy).toHaveBeenCalledWith("stores", JSON.stringify(expected.storeCollection));
        });
        test("Check that deleting a non-existing store returns an error", () => {

            // arrange
            const threeStores = storeFixtures.threeStores;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, stores: threeStores }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = storeUtils.del(99);

            // assert
            const expectedError = `store with id 99 not found`
            expect(result).toEqual({ error: expectedError });
            expect(setItemSpy).not.toHaveBeenCalled();
        });
        test("Check that an error is returned when id not passed", () => {

            // arrange
            const threeStores = storeFixtures.threeStores;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, stores: threeStores }));

            // act
            const result = storeUtils.del();

            // assert
            const expectedError = `id is a required parameter`
            expect(result).toEqual({ error: expectedError });
        });
    });
});

