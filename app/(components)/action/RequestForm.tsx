import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Autocomplete,
  type AutocompleteRenderInputParams,
  TextField,
  Select,
} from "formik-mui";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextFieldAlt from "@mui/material/TextField";
import { capitalize, formatNumber } from "@/utils/helpers";
import Divider from "../layout/Divider";
import type { AutocompleteRenderOptionState } from "@mui/material";
import type { User } from "@prisma/client";
import { users } from "@/utils/data";
import { useSupabaseClient, useToast } from "@/utils/hooks";
import { getCreditData } from "@/utils/credit/calculateCredit";

const defaultUser: User = {
  id: "0",
  firstName: "",
  otherNames: "",
  lastName: "",
  email: "",
  phone: "",
  role: "user",
  nationalId: "",
  status: "inactive",
  createdAt: new Date(""),
  lastActive: new Date(""),
};

users.unshift(defaultUser);

const RequestForm = ({
  sharesAmount,
  outStandingLoan,
}: {
  sharesAmount: number;
  outStandingLoan: number;
}) => {
  const supabaseClient = useSupabaseClient();
  const { showToast } = useToast();

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
    frequency: yup
      .string()
      .required("Frequency is required")
      .oneOf(
        ["weekly", "monthly", "quarterly", "yearly"],
        "Invalid frequency value"
      ),
    amount_per_frequency: yup
      .number()
      .moreThan(999, "Amount cannot be less than Ksh. 1,000")
      .required("Amount per frequency is required"),
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
      initialValues={{
        amount: 100,
        purpose: "",
        frequency: "",
        amount_per_frequency: 0,
        guarantor: users[0],
      }}
      validationSchema={validationSchema}
      // TODO: tidy up and take this to posters
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const userId = (await supabaseClient.auth.getUser()).data.user?.id;
          if (!userId) throw new Error("User not authenticated");

          const creditData = await getCreditData(userId);
          await fetch(`/api/users/${userId}/loans`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...values,
              creditData,
            }),
          });
        } catch (error: any) {
          showToast(error.toString(), "error");
        } finally {
          setSubmitting(false);
          resetForm();
        }
      }}
    >
      {({ submitForm, isSubmitting, values, isValid }) => (
        <Form
          style={{
            marginTop: 12,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <Field
            component={TextField}
            color="secondary"
            name="amount"
            type="number"
            label="Amount"
            style={{ width: "48%" }}
          />

          <FormControl style={{ width: "48%" }}>
            <Field
              component={Select}
              color="secondary"
              name="frequency"
              type="string"
              label="Frequency"
            >
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="quarterly">Quarterly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Field>
          </FormControl>

          <Field
            component={TextField}
            multiline
            maxRows={4}
            color="secondary"
            name="purpose"
            type="string"
            label="Purpose"
            style={{ width: "48%" }}
          />
          <Field
            component={TextField}
            color="secondary"
            name="amount_per_frequency"
            type="number"
            label={`Amount Per ${
              capitalize(values.frequency.split("ly")[0]) || "Frequency"
            }`}
            style={{ width: "48%" }}
            validate={(amount: number) => {
              if (values.frequency === "weekly") {
                if (amount > 10000)
                  return "Amount cannot be more than 10,000 for the selected frequency";
              } else if (values.frequency === "monthly") {
                if (amount > 100000 || amount < 10000)
                  return "Amount cannot be less than 10,000 or more than 100,000 for the selected frequency";
              } else if (values.frequency === "quarterly") {
                if (amount > 300000 || amount < 100000)
                  return "Amount cannot be less than 100,000 or more than 300,000 for the selected frequency";
              } else if (values.frequency === "yearly") {
                if (amount > 1000000 || amount < 300000)
                  return "Amount cannot be less than 300,000 or more than 1,000,000 for the selected frequency";
              }
            }}
          />

          {values.amount > sharesAmount && (
            <>
              <Divider />
              <Field
                component={Autocomplete}
                name="guarantor"
                options={users}
                renderOption={(
                  props: AutocompleteRenderOptionState,
                  option: User
                ) => (
                  <li {...props} key={option.id}>
                    {capitalize(option.firstName)}{" "}
                    {option.otherNames
                      ? capitalize(option.otherNames) + " "
                      : ""}
                    {capitalize(option.lastName)}
                  </li>
                )}
                getOptionLabel={(option: User) =>
                  `${option.firstName} ${
                    option.otherNames ? option.otherNames + " " : ""
                  }${option.lastName}`
                }
                style={{ width: "98%", margin: "0 auto" }}
                renderInput={(params: AutocompleteRenderInputParams) => {
                  return (
                    <TextFieldAlt
                      {...params}
                      fullWidth
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
