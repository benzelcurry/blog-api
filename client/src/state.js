import { createGlobalState } from 'react-hooks-global-state';

const { useGlobalState, setGlobalState } = createGlobalState({ token: '' });



export { useGlobalState };