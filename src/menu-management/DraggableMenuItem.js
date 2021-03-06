import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import Paper from 'material-ui/Paper/Paper';
import HeaderMenuItem from 'd2-ui/lib/app-header/menus/HeaderMenuItem';

import ItemTypes from './itemTypes';

/**
 * Implements the drag source contract.
 */
const cardSource = {
    beginDrag(props) {
        return {
            name: props.name,
        };
    },

    endDrag(props) {
        props.onListUpdated();
    },
};

const cardTarget = {
    hover(props, monitor, component) {
        const dragId = monitor.getItem().name;
        const hoverId = props.name;

        // Don't replace items with themselves
        if (dragId === hoverId) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect(); // eslint-disable-line

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Get horizontal middle
        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Get pixels to the left
        const hoverClientX = clientOffset.x - hoverBoundingRect.left;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        const isDraggingUp = dragId > hoverId && hoverClientY > hoverMiddleY;
        const isDraggingLeft = dragId > hoverId && hoverClientX > hoverMiddleX;
        const isDraggingDown = dragId < hoverId && hoverClientY < hoverMiddleY;
        const isDraggingRight = dragId < hoverId && hoverClientX < hoverMiddleX;

        // Dragging upwards or Dragging left
        if (isDraggingUp && isDraggingLeft) {
            return;
        }

        // Dragging downwards or Dragging right
        if (isDraggingDown && isDraggingRight) {
            return;
        }

        // Time to actually perform the action
        props.moveItem(dragId, hoverId);
    },
};

/**
 * Specifies the props to inject into your component.
 */
function collectForSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}

class DraggableMenuItem extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};
    }

    render() {
        const {
            isDragging,
            connectDragSource,
            connectDropTarget,
        } = this.props;

        const itemStyle = {
            visibility: isDragging ? 'hidden' : 'visible',
            padding: '3px',
            border: 'none',
            background: 'none',
        };

        const setHovering = () => {
            this.setState({ hover: true });
        };
        const unsetHovering = () => {
            this.setState({ hover: false });
        };

        const MenuItem = (
            <button style={itemStyle} onMouseDown={setHovering} onMouseOver={unsetHovering}>
                <Paper zDepth={this.state.hover ? 2 : 0}>
                    <HeaderMenuItem {...this.props} />
                </Paper>
            </button>
        );

        return connectDropTarget(connectDragSource(MenuItem));
    }
}

DraggableMenuItem.propTypes = {
    isDragging: PropTypes.bool,
    connectDragSource: PropTypes.func,
    connectDropTarget: PropTypes.func,
};

DraggableMenuItem.defaultProps = {
    isDragging: false,
    connectDragSource: () => {
    },
    connectDropTarget: () => {
    },
};

function collectForTarget(connect) {
    return {
        connectDropTarget: connect.dropTarget(),
    };
}

const DraggableMenuItemConnected = DragSource(ItemTypes.CARD, cardSource, collectForSource)(DraggableMenuItem);  // eslint-disable-line new-cap

export default DropTarget(ItemTypes.CARD, cardTarget, collectForTarget)(DraggableMenuItemConnected);  // eslint-disable-line new-cap
