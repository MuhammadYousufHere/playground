import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            logError: '',
        };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.log(error);
        this.setState({ logError: error });
        console.log(errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Something went wrong!</h2>
                    <p>{this.state.logError.toString()}</p>
                </div>
            );
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
