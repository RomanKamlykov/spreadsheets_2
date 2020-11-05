const { React, ReactDOM, axios } = window;
const { useState, useEffect } = React;

// const url = 'http://localhost:8888/.netlify/functions/getData';
const url = '/.netlify/functions/getData';

function App() {
  // data
  const [header, setHeader] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [input, setInput] = useState('');

  // mounted
  useEffect(() => {
    axios.get(url).then((response) => {
      setHeader(response.data.values[0]);
      setItems(response.data.values.slice(1));
    });
  }, []); // runs once on mount

  // methods
  function filterMethod() {
    // console.log(e.target.value);
    if (input) setFilteredItems(items.filter((item) => item[0].toLowerCase().includes(input.toLowerCase())));
  }

  if (items.length === 0) return (<div className="container mt-4">Loading...</div>);
  // template
  return (
    <div className="container mt-4">
      <div className="form-group">
        <input type="text" name="name" className="form-control" value={input} onChange={(e) => setInput(e.target.value)} onKeyUp={(e) => { if (e.key === 'Enter') filterMethod(); }} />
      </div>

      <table className="table table-sm table-borderless table-hover">
        <thead>
          <tr>
            {/* map th */}
            {header.slice(1).map((th, index) => <th key={index}>{th}</th>)}
          </tr>
        </thead>
        <tbody>
          {/* map tr>td>?a */}
          {filteredItems.map((tr, index) => (
            <tr key={index}>
              {tr.slice(1).map((td, index) => <td key={index}>{ td.startsWith('http') ? <a href={td} rel="noreferrer" target="_blank">{td}</a> : td }</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
