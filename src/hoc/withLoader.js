import React from "react";
import Loader from '../components/loader';

const withLoader = WrappedComponent => {
	const LoadingScreen = (props) => {
		const { isLoading } = props;
		return isLoading ? <Loader /> : <WrappedComponent {...props} />;
	}
	return LoadingScreen;
};

export default withLoader;