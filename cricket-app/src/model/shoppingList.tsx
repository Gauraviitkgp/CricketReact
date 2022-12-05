import React from 'react';
import './css/shoppingList.css'

export interface ShoppingListInput {
	name:string,
	favourite:string
} 

export default class ShoppingList extends React.Component<ShoppingListInput,{}> {
    constructor(props:ShoppingListInput){
        super(props)
    }
    render() {
		return React.createElement('div', {className:'shopping-list'},
			React.createElement('h1',{className:'header'},"Shopping List for ",this.props.name),
			React.createElement('ul'),
			React.createElement('li',null,"Instagram"),
			React.createElement('li',null,"WhatsApp"),
			React.createElement('li',null,this.props.favourite),
		)
    }
}