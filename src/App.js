import React, {Component} from 'react';
// import logo from './logo.svg';
// import { Flex, Box } from 'reflexbox';
import pllCases from './data/pll-cases';
import { Table, SearchColumns, search } from 'reactabular';

//styles
import './scss/App.scss';
import './scss/cube.scss';

const PllCaseTable = ({ cases }) => {
  const pllCases = cases.map( (caseDetails) => {
    return <PllCaseRow key={ caseDetails.case } caseDetails={ caseDetails }></PllCaseRow>;
  } );

  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Case</th>
          <th>Learned</th>
          <th>Name</th>
          <th className="text-left">Solutions</th>
        </tr>
      </thead>

      <tbody>
        { pllCases }
      </tbody>
    </table>
  );
};

const PllCaseRow = ({ caseDetails }) => {
  return (
    <tr>
      <td>
        <Cube caseName={caseDetails.case}></Cube>
      </td>
      <td>
        <LearnedCheckbox learned={caseDetails.learned}></LearnedCheckbox>
      </td>
      <td>{caseDetails.case}</td>
      <td className="text-left">{caseDetails.solution}</td>
    </tr>
  );
}

const LearnedCheckbox = ({ learned }) => {
  return (
    <input type="checkbox" defaultChecked={ learned } />
  );
}

const Cube = (props) => {
  let cssClasses = `cube cube--${props.caseName}`;

  return (
    <div className={cssClasses}>
      <div className="cube-face cube-face__upper">
        <div />
        <div />
      </div>

      <div className="cube-face cube-face__back">
        <div className="cube-small-face cube-small-face--horiz cube-small-face--1" />
        <div className="cube-small-face cube-small-face--horiz cube-small-face--2" />
        <div className="cube-small-face cube-small-face--horiz cube-small-face--3" />
      </div>

      <div className="cube-face cube-face__right">
        <div className="cube-small-face cube-small-face--vert cube-small-face--4" />
        <div className="cube-small-face cube-small-face--vert cube-small-face--5" />
        <div className="cube-small-face cube-small-face--vert cube-small-face--6" />
      </div>

      <div className="cube-face cube-face__front">
        <div className="cube-small-face cube-small-face--horiz cube-small-face--9" />
        <div className="cube-small-face cube-small-face--horiz cube-small-face--8" />
        <div className="cube-small-face cube-small-face--horiz cube-small-face--7" />
      </div>

      <div className="cube-face cube-face__left">
        <div className="cube-small-face cube-small-face--vert cube-small-face--12" />
        <div className="cube-small-face cube-small-face--vert cube-small-face--11" />
        <div className="cube-small-face cube-small-face--vert cube-small-face--10" />
      </div>
    </div>
  );
}

// -------

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: this.getColumns(),
      query: {}
    }
  }

  getColumns() {
    return [
      {
        property: 'case',
        header: {
          label: 'Case',
          format: () => <span>Case</span>
        },
        cell: {
          property: 'case',
          format: caseId => <Cube caseName={ caseId } />
        }
      },
      {
        property: 'case',
        header: {
          label: 'Name'
        }
      },
      {
        property: 'learned',
        header: {
          label: 'Learned'
        },
        cell: {
          format: learned => learned && <span>&#10003;</span>
          // format: learned => learned ? <span>&#10003;</span> : <span>&#10007;</span>
        }
      },
      {
        property: 'solution',
        header: {
          label: 'Solutions',
          props: {
            className: 'text-left'
          }
        },
        cell: {
          props: {
            className: 'text-left'
          }
        }
      }
    ];
  }

  render() {
    const { query, columns } = this.state;
    const searchedRows = search.multipleColumns({ columns, query })(pllCases)

    return (
      <div className="App">
        <Table.Provider
          className="table"
          columns={ columns }>

          <Table.Header>
            <SearchColumns
              query={ query }
              columns={ columns }
              onChange={ query => this.setState({ query }) } />
          </Table.Header>

          <Table.Body
            rows={ searchedRows }
            rowKey="case" />
        </Table.Provider>

        {/*<PllCaseTable cases={ pllCases } />*/}
      </div>
    )
  }
}

export default App;
