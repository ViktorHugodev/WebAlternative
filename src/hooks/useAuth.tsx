import { useContext } from 'react';
import {useProps} from '../../PropsContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;