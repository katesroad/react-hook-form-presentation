import schema, {nested} from './schema.ts';
import { getFields } from './sample';

describe('Compiler', () => {
  it('basic', () => {
    console.info(getFields(schema));
  });

  it.only('nested', ()  => {
    const result = getFields(nested);

    Object.keys(result).map(key =>{
        console.info( result[key].name, result[key])
    })
  })
});
