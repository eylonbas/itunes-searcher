import React from 'react';

export default class FilterBlock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filterTerm: props.lastFilterTerm
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    componentDidUpdate(prevProps) { // derived state implemention
        if (this.props.lastFilterTerm !== prevProps.lastFilterTerm) {
            this.setState(Object.assign(
                {},
                this.state,
                { filterTerm: this.props.lastFilterTerm }
            ));
        }
    }

    handleTextChange(e) {
        const newTerm = e.target.value;
        this.setState(Object.assign({}, this.state, { filterTerm: newTerm }));
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const term = this.state.filterTerm;
        this.props.handleSubmit(term);
    }

    render() {
        return (
            <form
                className='filter-block'
                onSubmit={this.handleFormSubmit}
            >
                <input
                    type='text'
                    className='filter-block-input'
                    onChange={this.handleTextChange}
                    placeholder='Search in iTunes'
                    value={this.state.filterTerm}
                />
                <button
                    type='submit'
                    className='filter-block-submit'
                    onClick={this.handleFormSubmit}>
                    Submit
                    </button>
            </form>
        );
    }
}