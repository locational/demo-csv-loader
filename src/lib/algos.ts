import { Algo } from "../lib/types";


export const algos: Algo[] = [
  {
    fn_name: "fn-adaptive-sampling",
    docs_url:
      "https://github.com/disarm-platform/fn-adaptive-sampling/blob/master/SPECS.md",
    title: "Adaptive sampling",
    intent: "Recommend sampling locations",
    description: `Generates recommendations for best sampling or survey locations.
    Existing results are used if they exist.
    If not, a random, but distributed sample is created.`,
    fields: [
      { field_name: "latitude", required: false, type: "number" },
      { field_name: "longitude", required: false, type: "number" },
      { field_name: "exceedance_uncertainty", required: false, type: "number" },
      { field_name: "bci_width", required: false, type: "number" }
    ],
    params: [
      {
        name: "batch_size",
        type: "number",
        default: 10
      },
      {
        name: "uncertainty_fieldname",
        required: false,
        type: "string",
        default: "exceedance_uncertainty"
      }
    ],
    return_fields: [{ field_name: "adaptively_selected", type: "boolean" }],
    remote: true
  },
  {
    fn_name: "fn-prevalence-predictor",
    docs_url:
      "https://github.com/disarm-platform/fn-prevalence-predictor/blob/master/SPECS.md",
    title: "Coverage predictor",
    intent: "Generate coverage map",
    description: "Predict coverage at all sites based on existing survey data.",
    fields: [
      { field_name: "latitude", required: false, type: "number" },
      { field_name: "longitude", required: false, type: "number" },
      { field_name: "n_trials", required: true, type: "number" },
      { field_name: "n_positive", required: true, type: "number" }
    ],
    params: [
      {
        name: "exceedance_threshold",
        required: false,
        type: "number"
      },
      {
        name: "layer_names",
        required: false,
        type: "array"
      }
    ],
    return_fields: [
      { field_name: "prevalence_prediction", type: "number" },
      { field_name: "prevalence_bci_width", type: "number" },
      { field_name: "exceedance_probability", type: "number" },
      { field_name: "exceedance_uncertainty", type: "number" }
    ],
    remote: true
  }
];
