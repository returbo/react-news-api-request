import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import Sort from "../Sort"

const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments').reverse(),
    POINTS: list => sortBy(list, 'points').reverse(),
  }

class Table extends Component {
    constructor(props) {
      super(props);
      this.state = {
        sortKey: 'NONE',
        isSortReverse: false,
      };
      this.onSort = this.onSort.bind(this);
    }
  
    onSort(sortKey) {
      const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
      this.setState({ sortKey, isSortReverse });
    }
  
    render() {
      const {
        list,
        onDismiss,
      } = this.props;
  
      const {
        sortKey,
        isSortReverse
      } = this.state;
  
  
      const sortedList = SORTS[sortKey](list);
      const reverseSortedList = isSortReverse
        ? sortedList.reverse()
        : sortedList;
  
      return (
        <div className="table">
          <div className="table-header">
            <span style={{ width: '40%' }}>
              <Sort
                sortKey={"TITLE"}
                onSort={this.onSort}
                activeSortKey={sortKey}
              >
                OBJECT
          </Sort>
            </span>
            <span style={{ width: '30%' }}>
              <Sort
                sortKey={"AUTHOR"}
                onSort={this.onSort}
                activeSortKey={sortKey}
              >
                AUTHOR
          </Sort>
            </span>
            <span style={{ width: '10%' }}>
              <Sort
                sortKey={"COMMENTS"}
                onSort={this.onSort}
                activeSortKey={sortKey}
              >
                COMMENTS
         </Sort>
            </span>
            <span style={{ width: '10%' }}>
              <Sort
                sortKey={"POINTS"}
                onSort={this.onSort}
                activeSortKey={sortKey}
              >
                POINTS
          </Sort>
            </span>
            <span style={{ width: '10%' }} />
          </div>
          {reverseSortedList.map(item =>
            <div key={item.objectID} className="table-row">
              <span style={{ width: '40%' }}>
                <a href={item.url}>
                  {item.title}
                </a>
              </span>
              <span style={{ width: '30%' }}>
                {item.author}
              </span>
              <span style={{ width: '10%' }}>
                {item.num_comments}
              </span>
              <span style={{ width: '10%' }}>
                {item.points}
              </span>
              <span style={{ width: '10%' }}>
                <Button
                  onClick={() => onDismiss(item.objectID)}
                  className="button-inline"
                >
                  Удалить
            </Button>
              </span>
            </div>
          )}
        </div>
      );
    }
  }
  
  Table.propTypes = {
    list: PropTypes.array.isRequired,
    onDismiss: PropTypes.func.isRequired,
  }

  export default Table;