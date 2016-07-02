import React, { Component } from 'react';
import DraggableMenuItem from './DraggableMenuItem';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const HTML5DragDropContext = DragDropContext(HTML5Backend);

const MenuItemList = HTML5DragDropContext(class MenuItemList extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            items: props.items,
        };

        this.moveItem = this.moveItem.bind(this);
        this.onListUpdated = this.onListUpdated.bind(this);
    }

    moveItem(dragId, targetId) {
        const dragIndex = this.state.items.findIndex(option => option.name === dragId);
        const targetIndex = this.state.items.findIndex(option => option.name === targetId);
        const dragOption = this.state.items[dragIndex];

        const newList = [...this.state.items];

        newList.splice(dragIndex, 1);
        newList.splice(targetIndex, 0, dragOption);

        this.setState({
            items: newList,
        });
    }

    onListUpdated() {
        this.props.onListUpdated(this.state.items, this.props.items);
    }

    render() {
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '533px', }}>
                {this.state.items.map((item, index) => (
                    <DraggableMenuItem
                        key={item.name} {...item}
                        index={index}
                        moveItem={this.moveItem}
                        onListUpdated={this.onListUpdated}
                    />
                ))}
            </div>
        );
    }
});

export default MenuItemList;