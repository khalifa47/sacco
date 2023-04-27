import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Autocomplete,
  type AutocompleteRenderInputParams,
  TextField,
} from "formik-mui";
import Button from "@mui/material/Button";
import TextFieldAlt from "@mui/material/TextField";
import { formatNumber } from "@/utils/helpers";
import Divider from "../layout/Divider";
import type { AutocompleteRenderOptionState } from "@mui/material";

const userData: User[] = [
  {
    id: "1",
    firstName: "John",
    otherNames: "Jacob",
    lastName: "Smith",
    email: "john.jacob.smith@example.com",
    status: "active",
    dateJoined: "2022-01-01",
    dateActive: "2022-01-02",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    status: "active",
    dateJoined: "2022-01-02",
    dateActive: "2022-01-03",
  },
  {
    id: "3",
    firstName: "Bob",
    lastName: "Jones",
    email: "bob.jones@example.com",
    status: "active",
    dateJoined: "2022-01-03",
    dateActive: "2022-01-04",
  },
  {
    id: "4",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@example.com",
    status: "active",
    dateJoined: "2022-01-04",
    dateActive: "2022-01-05",
  },
  {
    id: "5",
    firstName: "Alex",
    otherNames: "M.",
    lastName: "Johnson",
    email: "alex.m.johnson@example.com",
    status: "active",
    dateJoined: "2022-01-05",
    dateActive: "2022-01-06",
  },
  {
    id: "6",
    firstName: "Emily",
    lastName: "Brown",
    email: "emily.brown@example.com",
    status: "active",
    dateJoined: "2022-01-06",
    dateActive: "2022-01-07",
  },
  {
    id: "7",
    firstName: "Chris",
    lastName: "Green",
    email: "chris.green@example.com",
    status: "active",
    dateJoined: "2022-01-07",
    dateActive: "2022-01-08",
  },
  {
    id: "8",
    firstName: "Sarah",
    lastName: "Taylor",
    email: "sarah.taylor@example.com",
    status: "active",
    dateJoined: "2022-01-08",
    dateActive: "2022-01-09",
  },
  {
    id: "9",
    firstName: "Michael",
    lastName: "Davis",
    email: "michael.davis@example.com",
    status: "active",
    dateJoined: "2022-01-09",
    dateActive: "2022-01-10",
  },
  {
    id: "10",
    firstName: "Jennifer",
    lastName: "Lee",
    email: "jennifer.lee@example.com",
    status: "active",
    dateJoined: "2022-01-10",
    dateActive: "2022-01-11",
  },
];
const defaultUser: User = {
  id: "0",
  firstName: "",
  lastName: "",
  email: "",
  dateJoined: "",
  status: "inactive",
  dateActive: "",
};

userData.unshift(defaultUser);

const RequestForm = ({
  sharesAmount,
  outStandingLoan,
}: {
  sharesAmount: number;
  outStandingLoan: number;
}) => {
  const allowedLoanMax = 3 * sharesAmount - outStandingLoan;
  const validationSchema = yup.object({
    amount: yup
      .number()
      .required("Amount is required.")
      .lessThan(
        allowedLoanMax + 1,
        `Amount cannot exceed Ksh. ${formatNumber(allowedLoanMax)}`
      )
      .moreThan(99, "Amount cannot be less than Ksh. 100"),
    purpose: yup.string().required("Purpose is required."),
    guarantor: yup.object().when("amount", {
      is: (amount: number) => amount > sharesAmount,
      then: (schema: yup.ObjectSchema<any>) =>
        schema.required("Guarantor is required.").test({
          name: "is-valid-ID",
          message: "Guarantor is required.",
          test: (value: any) => value.id !== defaultUser.id,
        }),
    }),
  });
  return (
    <Formik
      initialValues={{ amount: 100, purpose: "", guarantor: userData[0] }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting, values, isValid }) => (
        <Form
          style={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Field
            component={TextField}
            color="secondary"
            name="amount"
            type="number"
            label="Amount"
          />
          <Field
            component={TextField}
            multiline
            maxRows={4}
            color="secondary"
            name="purpose"
            type="string"
            label="Purpose"
          />
          {values.amount > sharesAmount && (
            <>
              <Divider />
              <Field
                component={Autocomplete}
                name="guarantor"
                options={userData}
                renderOption={(
                  props: AutocompleteRenderOptionState,
                  option: User
                ) => (
                  <li {...props} key={option.id}>
                    {option.firstName}{" "}
                    {option.otherNames ? option.otherNames + " " : ""}
                    {option.lastName}
                  </li>
                )}
                getOptionLabel={(option: User) =>
                  `${option.firstName} ${
                    option.otherNames ? option.otherNames + " " : ""
                  }${option.lastName}`
                }
                style={{ width: 300 }}
                renderInput={(params: AutocompleteRenderInputParams) => {
                  return (
                    <TextFieldAlt
                      {...params}
                      name="guarantor"
                      type="string"
                      color="secondary"
                      label="Guarantor"
                    />
                  );
                }}
              />
            </>
          )}

          {isSubmitting ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              size="small"
              disabled={!isValid}
              onClick={submitForm}
            >
              request for a loan
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default RequestForm;
