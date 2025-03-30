import { readFileSync, writeFileSync } from 'fs';
import { unserialize } from 'php-unserialize';

const contents = readFileSync('radiator_builder_data.txt', 'utf8');


const result = unserialize(contents);


writeFileSync('radiator_builder_data.json', `${JSON.stringify(result)}`);