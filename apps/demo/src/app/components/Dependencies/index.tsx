import { Button, FormField } from '@react-hook-form/shared-components';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import EmissionFactor from './EmissionFactor';
import OccupancyClass from './OccupancyClass';
import RequireAuth from './RequireAuth';

export default function App() {
  const methods = useForm({
    defaultValues: {
      classes: [
        {
          group: '',
          limit: '',
          units: '',
        },
      ],
      commondities: [
        {
          commondity: '',
          factor: '',
          units: 'none',
          timestamp: '',
        },
      ],
      isAuthed: false,
    },
  });

  const onSubmit = (data: Record<string, boolean | any[]>) => console.log(data);

  const {
    fields: occupancyClasses = [],
    append: addCoccupanyClass,
    remove: removeOccpanyClass,
  } = useFieldArray({
    name: 'classes',
    control: methods.control,
  });

  const {
    fields: commondities = [],
    append: addCommondity,
    remove: removeCommodity,
  } = useFieldArray({
    name: 'commondities',
    control: methods.control,
  });

  const isAuthed = methods.watch('isAuthed');

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Occupancy class */}
        {occupancyClasses.map((item, index) => (
          <OccupancyClass index={index} name="classes" key={index}>
            <p>
              {occupancyClasses.length > 1 && (
                <Button onClick={() => removeOccpanyClass(index)}>-</Button>
              )}
              {index + 1 === occupancyClasses.length && (
                <Button
                  type="button"
                  onClick={() =>
                    addCoccupanyClass({
                      group: '',
                      limit: '',
                      units: '',
                    })
                  }
                >
                  +
                </Button>
              )}
            </p>
          </OccupancyClass>
        ))}

        {/* Commondity */}
        {commondities.map((item, index) => (
          <EmissionFactor index={index} name="commondities" key={index}>
            <p>
              {commondities.length > 1 && (
                <Button onClick={() => removeCommodity(index)}>-</Button>
              )}
              {index + 1 === commondities.length && (
                <Button
                  type="button"
                  onClick={() =>
                    addCommondity({
                      commondity: '',
                      factor: '',
                      units: 'none',
                      timestamp: '',
                    })
                  }
                >
                  +
                </Button>
              )}
            </p>
          </EmissionFactor>
        ))}
        {/* Sign in */}
        <FormField label="Add Authed By" inline>
          <input
            type="checkbox"
            {...methods.register('isAuthed', {
              required: 'Please sign your name',
            })}
          />
        </FormField>
        {isAuthed && <RequireAuth />}
        <input type="submit" />
      </form>
    </FormProvider>
  );
}
