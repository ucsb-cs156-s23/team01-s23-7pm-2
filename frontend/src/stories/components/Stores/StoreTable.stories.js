import React from 'react';
import StoreTable from 'main/components/Stores/StoreTable';
import { storeFixtures } from 'fixtures/storeFixtures';

export default {
    title: 'components/Stores/StoreTable',
    component: StoreTable
};

const Template = (args) => {
    return (
        <StoreTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    stores: []
};

export const ThreeSubjectsNoButtons = Template.bind({});

ThreeSubjectsNoButtons.args = {
    stores: storeFixtures.threeStores,
    showButtons: false
};

export const ThreeSubjectsWithButtons = Template.bind({});
ThreeSubjectsWithButtons.args = {
    stores: storeFixtures.threeStores,
    showButtons: true
};
