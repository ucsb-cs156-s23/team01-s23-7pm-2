// get stores from local storage
const get = () => {
	const storeValue = localStorage.getItem("stores");
	if (storeValue === undefined) {
		const storeCollection = { nextId: 1, stores: [] }
		return set(storeCollection);
	}
	const storeCollection = JSON.parse(storeValue);
	if (storeCollection === null) {
		const storeCollection = { nextId: 1, stores: [] }
		return set(storeCollection);
	}
	return storeCollection;
};

const getById = (id) => {
	if (id === undefined) {
		return { "error": "id is a required parameter" };
	}
	const storeCollection = get();
	const stores = storeCollection.stores;

	/* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
	const index = stores.findIndex((r) => r.id == id);
	if (index === -1) {
		return { "error": `store with id ${id} not found` };
	}
	return { store: stores[index] };
}

// set stores in local storage
const set = (storeCollection) => {
	localStorage.setItem("stores", JSON.stringify(storeCollection));
	return storeCollection;
};

// add a store to local storage
const add = (store) => {
	const storeCollection = get();
	store = { ...store, id: storeCollection.nextId };
	storeCollection.nextId++;
	storeCollection.stores.push(store);
	set(storeCollection);
	return store;
};

// update a store in local storage
const update = (store) => {
	const storeCollection = get();

	const stores = storeCollection.stores;

	/* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
	const index = stores.findIndex((r) => r.id == store.id);
	if (index === -1) {
		return { "error": `store with id ${store.id} not found` };
	}
	stores[index] = store;
	set(storeCollection);
	return { storeCollection: storeCollection };
};

// delete a restaurant from local storage
const del = (id) => {
	if (id === undefined) {
		return { "error": "id is a required parameter" };
	}
	const storeCollection = get();
	const stores = storeCollection.stores;

	/* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
	const index = stores.findIndex((r) => r.id == id);
	if (index === -1) {
		return { "error": `store with id ${id} not found` };
	}
	stores.splice(index, 1);
	set(storeCollection);
	return { storeCollection: storeCollection };
};

const storeUtils = {
	get,
	getById,
	add,
	update,
	del
};

export { storeUtils };



