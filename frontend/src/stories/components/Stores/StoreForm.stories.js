import React from 'react';
import StoreForm from "main/components/Stores/StoreForm"
import { storeFixtures } from 'fixtures/storeFixtures';

export default {
    title: 'components/Stores/StoreForm',
    component: StoreForm
};

const Template = (args) => {
    return (
        <StoreForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    submitText: "Create",
    submitAction: () => { console.log("Submit was clicked"); }
};

export const Show = Template.bind({});

Show.args = {
    Store: storeFixtures.oneStore,
    submitText: "",
    submitAction: () => { }
};