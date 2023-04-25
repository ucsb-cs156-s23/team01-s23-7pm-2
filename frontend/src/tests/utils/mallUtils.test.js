import { mallFixtures } from "fixtures/mallFixtures";
import { mallUtils } from "main/utils/mallUtils";

describe("mallUtils tests", () => {
    // return a function that can be used as a mock implementation of getItem
    // the value passed in will be convertd to JSON and returned as the value
    // for the key "malls".  Any other key results in an error
    const createGetItemMock = (returnValue) => (key) => {
        if (key === "malls") {
            return JSON.stringify(returnValue);
        } else {
            throw new Error("Unexpected key: " + key);
        }
    };

    describe("get", () => {

        test("When malls is undefined in local storage, should set to empty list", () => {

            // arrange
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(undefined));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = mallUtils.get();

            // assert
            const expected = { nextId: 1, malls: [] } ;
            expect(result).toEqual(expected);

            const expectedJSON = JSON.stringify(expected);
            expect(setItemSpy).toHaveBeenCalledWith("malls", expectedJSON);
        });

        test("When malls is null in local storage, should set to empty list", () => {

            // arrange
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(null));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = mallUtils.get();

            // assert
            const expected = { nextId: 1, malls: [] } ;
            expect(result).toEqual(expected);

            const expectedJSON = JSON.stringify(expected);
            expect(setItemSpy).toHaveBeenCalledWith("malls", expectedJSON);
        });

        test("When malls is [] in local storage, should return []", () => {

            // arrange
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 1, malls: [] }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = mallUtils.get();

            // assert
            const expected = { nextId: 1, malls: [] };
            expect(result).toEqual(expected);

            expect(setItemSpy).not.toHaveBeenCalled();
        });

        test("When malls is JSON of three malls, should return that JSON", () => {

            // arrange
            const threemalls = mallFixtures.threemalls;
            const mockmallCollection = { nextId: 10, malls: threemalls };

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(mockmallCollection));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = mallUtils.get();

            // assert
            expect(result).toEqual(mockmallCollection);
            expect(setItemSpy).not.toHaveBeenCalled();
        });
    });


    describe("getById", () => {
        test("Check that getting a mall by id works", () => {

            // arrange
            const threemalls = mallFixtures.threemalls;
            const idToGet = threemalls[1].id;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, malls: threemalls }));

            // act
            const result = mallUtils.getById(idToGet);

            // assert

            const expected = { mall: threemalls[1] };
            expect(result).toEqual(expected);
        });

        test("Check that getting a non-existing mall returns an error", () => {

            // arrange
            const threemalls = mallFixtures.threemalls;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, malls: threemalls }));

            // act
            const result = mallUtils.getById(99);

            // assert
            const expectedError = `mall with id 99 not found`
            expect(result).toEqual({ error: expectedError });
        });

        test("Check that an error is returned when id not passed", () => {

            // arrange
            const threemalls = mallFixtures.threemalls;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, malls: threemalls }));

            // act
            const result = mallUtils.getById();

            // assert
            const expectedError = `id is a required parameter`
            expect(result).toEqual({ error: expectedError });
        });

    });
    describe("add", () => {
        test("Starting from [], check that adding one mall works", () => {

            // arrange
            const mall = mallFixtures.onemall[0];
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 1, malls: [] }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = mallUtils.add(mall);

            // assert
            expect(result).toEqual(mall);
            expect(setItemSpy).toHaveBeenCalledWith("malls",
                JSON.stringify({ nextId: 2, malls: mallFixtures.onemall }));
        });
    });

    describe("update", () => {
        test("Check that updating an existing mall works", () => {

            // arrange
            const threemalls = mallFixtures.threemalls;
            const updatedmall = {
                ...threemalls[0],
                name: "Updated Name"
            };
            const threemallsUpdated = [
                updatedmall,
                threemalls[1],
                threemalls[2]
            ];

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, malls: threemalls }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = mallUtils.update(updatedmall);

            // assert
            const expected = { mallCollection: { nextId: 5, malls: threemallsUpdated } };
            expect(result).toEqual(expected);
            expect(setItemSpy).toHaveBeenCalledWith("malls", JSON.stringify(expected.mallCollection));
        });
        test("Check that updating an non-existing mall returns an error", () => {

            // arrange
            const threemalls = mallFixtures.threemalls;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, malls: threemalls }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            const updatedmall = {
                id: 99,
                name: "Fake Name",
                description: "Fake Description"
            }

            // act
            const result = mallUtils.update(updatedmall);

            // assert
            const expectedError = `mall with id 99 not found`
            expect(result).toEqual({ error: expectedError });
            expect(setItemSpy).not.toHaveBeenCalled();
        });
    });

    describe("del", () => {
        test("Check that deleting a mall by id works", () => {

            // arrange
            const threemalls = mallFixtures.threemalls;
            const idToDelete = threemalls[1].id;
            const threemallsUpdated = [
                threemalls[0],
                threemalls[2]
            ];

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, malls: threemalls }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = mallUtils.del(idToDelete);

            // assert

            const expected = { mallCollection: { nextId: 5, malls: threemallsUpdated } };
            expect(result).toEqual(expected);
            expect(setItemSpy).toHaveBeenCalledWith("malls", JSON.stringify(expected.mallCollection));
        });
        test("Check that deleting a non-existing mall returns an error", () => {

            // arrange
            const threemalls = mallFixtures.threemalls;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, malls: threemalls }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = mallUtils.del(99);

            // assert
            const expectedError = `mall with id 99 not found`
            expect(result).toEqual({ error: expectedError });
            expect(setItemSpy).not.toHaveBeenCalled();
        });
        test("Check that an error is returned when id not passed", () => {

            // arrange
            const threemalls = mallFixtures.threemalls;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, malls: threemalls }));

            // act
            const result = mallUtils.del();

            // assert
            const expectedError = `id is a required parameter`
            expect(result).toEqual({ error: expectedError });
        });
    });
});