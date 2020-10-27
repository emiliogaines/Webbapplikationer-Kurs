const { render } = require("@testing-library/react");
const { Component } = require("react");

export defualt class DisplayOwners extends Component {

componentDidMount() {
    this.fetchOwners();
}

handleClickEvent(id) {

}

render(){
    return (
        <ul>
            {this.state.owners.map((item) => (
                <li onclick={() => handleClickEvent(item.id)}>{item.name}</li>
            ))}
        </ul>
    )
}
}