import React from 'react';

import { configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Table from './Table';

configure({ adapter: new Adapter() });

describe('Table', () => {
	it('Basic render test', () => {
		const conf = {};
		const cols = [
			{ name: 'name', title: 'Pet name' },
			{ name: 'class', title: 'Animal class' },
			{ name: 'age', title: 'Age' },
			{ name: 'gender', title: 'Gender' }
		];
		const rows = [
			{ name: 'Buddy', class: 'Dog', age: 3, gender: 'male' },
			{ name: 'Molly', class: 'Cat', age: 15, gender: 'female' },
			{ name: 'Bonnie', class: 'Cat', age: 2, gender: 'female' },
			{ name: 'Coco', class: 'Parrot', age: 22, gender: 'male' },
			{ name: 'Oscar', class: 'Dog', age: 5, gender: 'male' },
			{ name: 'Max', class: 'Turtle', age: 15, gender: 'male' },
			{ name: 'Jack', class: 'Varan', age: 1, gender: 'male' }
		];
		const filter = null;
		
		const wrapper = render (
	        <Table
				{...conf}
				cols={cols}
				rows={rows}
				filter={filter} />
		);
		expect(wrapper).toMatchSnapshot();
	});
	
	it('With sorting', () => {
		const conf = {};
		const cols = [
			{ name: 'name', title: 'Pet name' },
			{ name: 'class', title: 'Animal class', sortOrder: 1, sortDirection: 'ASC' },
			{ name: 'age', title: 'Age', sortOrder: 2, sortDirection: 'ASC' },
			{ name: 'gender', title: 'Gender' }
		];
		const rows = [
			{ name: 'Buddy', class: 'Dog', age: 3, gender: 'male' },
			{ name: 'Molly', class: 'Cat', age: 15, gender: 'female' },
			{ name: 'Bonnie', class: 'Cat', age: 2, gender: 'female' },
			{ name: 'Coco', class: 'Parrot', age: 22, gender: 'male' },
			{ name: 'Oscar', class: 'Dog', age: 5, gender: 'male' },
			{ name: 'Max', class: 'Turtle', age: 15, gender: 'male' },
			{ name: 'Jack', class: 'Varan', age: 1, gender: 'male' }
		];
		const filter = null;
		
		const wrapper = render (
			<Table
				{...conf}
				cols={cols}
				rows={rows}
				filter={filter} />
		);
		expect(wrapper).toMatchSnapshot();
	});
	
	it('With pagination', () => {
	    const conf = {
			rowsPerPage: 2,
			selectable: true
		};
		const cols = [
			{ name: 'name', title: 'Pet name' },
			{ name: 'class', title: 'Animal class', sortOrder: 1, sortDirection: 'ASC' },
			{ name: 'age', title: 'Age', sortOrder: 2, sortDirection: 'ASC' },
			{ name: 'gender', title: 'Gender' }
		];
		const rows = [
			{ name: 'Buddy', class: 'Dog', age: 3, gender: 'male' },
			{ name: 'Molly', class: 'Cat', age: 15, gender: 'female' },
			{ name: 'Bonnie', class: 'Cat', age: 2, gender: 'female' },
			{ name: 'Coco', class: 'Parrot', age: 22, gender: 'male' },
			{ name: 'Oscar', class: 'Dog', age: 5, gender: 'male' },
			{ name: 'Max', class: 'Turtle', age: 15, gender: 'male' },
			{ name: 'Jack', class: 'Varan', age: 1, gender: 'male' }
		];
		const filter = null;
		
		const wrapper = render (
			<Table
				{...conf}
				cols={cols}
				rows={rows}
				filter={filter} />
		);
		expect(wrapper).toMatchSnapshot();
	});
	
	it('With no data', () => {
	    const conf = {
			rowsPerPage: 2,
			selectable: true
		};
		const cols = [
			{ name: 'name', title: 'Pet name' },
			{ name: 'class', title: 'Animal class', sortOrder: 1, sortDirection: 'ASC' },
			{ name: 'age', title: 'Age', sortOrder: 2, sortDirection: 'ASC' },
			{ name: 'gender', title: 'Gender' }
		];
		const rows = [];
		const filter = null;
		
		const wrapper = render (
			<Table
				{...conf}
				cols={cols}
				rows={rows}
				filter={filter} />
		);
		expect(wrapper).toMatchSnapshot();
	});
	
	it('multiSort', () => {
		const conf = {};
		const cols = [
			{ name: 'name', title: 'Pet name' },
			{ name: 'class', title: 'Animal class' },
			{ name: 'age', title: 'Age', sortOrder: 1, sortDirection: 'ASC' },
			{ name: 'gender', title: 'Gender' }
		];
		const rows = [
			{ name: 'Buddy', class: 'Dog', age: 3, gender: 'male' },
			{ name: 'Molly', class: 'Cat', age: 15, gender: 'female' },
			{ name: 'Bonnie', class: 'Cat', age: 2, gender: 'female' },
			{ name: 'Coco', class: 'Parrot', age: 22, gender: 'male' }
		];
		const filter = null;
		const result = [
			{ name: 'Bonnie', class: 'Cat', age: 2, gender: 'female' },
			{ name: 'Buddy', class: 'Dog', age: 3, gender: 'male' },
			{ name: 'Molly', class: 'Cat', age: 15, gender: 'female' },
			{ name: 'Coco', class: 'Parrot', age: 22, gender: 'male' }
		];
		const sortParams = [{ name: 'age', dir: 'ASC' }];
		
		const wrapper = mount(
			<Table
				{...conf}
				cols={cols}
				rows={rows}
				filter={filter} />
		);
		expect(wrapper.instance().multiSort(rows, sortParams)).toEqual(result);
	});
	
	it('filterRows', () => {
		const conf={};
		const filter = {d_id: '1'};
		const cols = [
			{name: 'd_id', title: 'ID'},
			{name: 'd_title', title: 'Title'},
		];
		const rows = [
			{d_id: 1, d_title: 'a'},
			{d_id: 2, d_title: 'b'},
			{d_id: 10, d_title: 'c'}
		];
		const result = [
			{d_id: 1, d_title: 'a'},
			{d_id: 10, d_title: 'c'}			
		];
		
		const wrapper = mount(
			<Table
				{...conf}
				cols={cols}
				rows={rows}
				filter={filter} />
		);
		
		expect(wrapper.instance().filterRows(rows, cols, filter)).toEqual(result);
	});
	
	it('Change sorting', () => {
	    const conf = {};
		const cols = [
			{ name: 'name', title: 'Pet name' },
			{ name: 'class', title: 'Animal class', sortOrder: 1, sortDirection: 'ASC' },
			{ name: 'age', title: 'Age', sortOrder: 2, sortDirection: 'ASC' },
			{ name: 'gender', title: 'Gender' }
		];
		const rows = [
			{ name: 'Buddy', class: 'Dog', age: 3, gender: 'male' },
			{ name: 'Molly', class: 'Cat', age: 15, gender: 'female' },
			{ name: 'Bonnie', class: 'Cat', age: 2, gender: 'female' },
			{ name: 'Coco', class: 'Parrot', age: 22, gender: 'male' },
			{ name: 'Oscar', class: 'Dog', age: 5, gender: 'male' },
			{ name: 'Max', class: 'Turtle', age: 15, gender: 'male' },
			{ name: 'Jack', class: 'Varan', age: 1, gender: 'male' }
		];
		const filter = null;
		
		const wrapper = mount (
			<Table
				{...conf}
				cols={cols}
				rows={rows}
				filter={filter} />
		);
		expect(wrapper.find('tbody tr')).toHaveLength(7);
		
		const thPetName = wrapper.find('thead th').at(0);
		thPetName.simulate('mousedown'); // sort ASC
		
		const tNames = wrapper.find('tbody tr td:first-child');
		let ascNames = ['Bonnie', 'Buddy', 'Coco', 'Jack', 'Max', 'Molly', 'Oscar'];
		for (let i = 0; i<ascNames.length; i++)
			expect(tNames.at(i).text()).toEqual(ascNames[i]);
			
		thPetName.simulate('mousedown'); // sort DESC
		let descNames = ascNames.reverse();
		for (let i = 0; i<descNames.length; i++)
			expect(tNames.at(i).text()).toEqual(descNames[i]);		
	});
	
	it('Selection', () =>  {
		const conf = {};
		const cols = [
			{ name: 'name', title: 'Pet name' },
			{ name: 'class', title: 'Animal class', sortOrder: 1, sortDirection: 'ASC' },
			{ name: 'age', title: 'Age', sortOrder: 2, sortDirection: 'ASC' },
			{ name: 'gender', title: 'Gender' }
		];
		const rows = [
			{ name: 'Buddy', class: 'Dog', age: 3, gender: 'male' },
			{ name: 'Molly', class: 'Cat', age: 15, gender: 'female' },
			{ name: 'Bonnie', class: 'Cat', age: 2, gender: 'female' },
			{ name: 'Coco', class: 'Parrot', age: 22, gender: 'male' },
			{ name: 'Oscar', class: 'Dog', age: 5, gender: 'male' },
			{ name: 'Max', class: 'Turtle', age: 15, gender: 'male' },
			{ name: 'Jack', class: 'Varan', age: 1, gender: 'male' }
		];
		const filter = null;
		
		const wrapper = mount (
			<Table
				{...conf}
				cols={cols}
				rows={rows}
				filter={filter} />
		);
	});
});
