import Home from './App/Home.react';
import MaleList from './User/MaleList.react';
import Detail from './Detail';

export default {
    home: {
        title: 'Contacts',
        Page: Home,
    },
    detail: {
        title: 'Details',
        Page: Detail,
    },
    maleList: {
        title: 'Male List',
        Page: MaleList,
    },
};
