import { merge } from 'lodash';

// project import
import Button from './Button';
import Card from './Card';

// ==============================|| OVERRIDES - MAIN ||============================== //

export default function ComponentsOverrides(theme) {
    return merge(
        Button(theme),
        Card(theme)
    );
}
