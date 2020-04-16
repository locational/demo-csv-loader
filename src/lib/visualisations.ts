import chroma from "chroma-js";
import {
  AttributeType,
  NumericAggregationFunctionOptions,
  VisualisationDefinition
} from "../lib/types";

// TODO: Stop using specific key names to describe range of visualisation options
interface VisualisationDefs {
  targets: VisualisationDefinition;
  survey: VisualisationDefinition;
  sampling: VisualisationDefinition;
  coverage: VisualisationDefinition;
  confidence: VisualisationDefinition;
}

// TODO: See above, convert to array of Visualisations
export const visualisations: VisualisationDefs = {
  targets: {
    id: "targets",
    title: "Intervention targets",
    palette: ["red", "blue"],
    attribute: undefined,
    modes: {
      target: {
        measure: "targets"
      },
      aggregation: {
        function: NumericAggregationFunctionOptions.count,
        measure: "count of targets"
      }
    }
  },
  survey: {
    id: "survey",
    title: "Survey result",
    palette: chroma.brewer.YlOrRd,
    attribute: {
      field: "n_positive",
      type: AttributeType.continuous
    },
    modes: {
      target: {
        measure: "Number of positive samples"
      },
      aggregation: {
        measure: "maximum number of positive samples",
        function: NumericAggregationFunctionOptions.max
      }
    }
  },
  sampling: {
    id: "sampling",
    title: "Targets selected for sampling",
    palette: ["#99d594", "#fc8d59"],
    attribute: {
      field: "adaptively_selected",
      type: AttributeType.boolean
    },
    modes: {
      target: {
        measure: "selected or not"
      },
      // Not implemented an aggregation. Yet.
      aggregation: undefined
    }
  },
  coverage: {
    id: "coverage",
    title: "Predicted coverage",
    palette: chroma.brewer.RdYlGn,
    attribute: {
      field: "prevalence_prediction",
      type: AttributeType.continuous
    },
    modes: {
      target: {
        measure: "predicted coverage"
      },
      aggregation: {
        measure: "mean predicted coverage",
        function: NumericAggregationFunctionOptions.mean
      }
    }
  },
  confidence: {
    id: "confidence",
    palette: chroma.brewer.RdYlBu.reverse(),
    title: "Uncertainty of prediction",
    attribute: {
      field: "prevalence_bci_width",
      type: AttributeType.continuous
    },
    modes: {
      target: {
        measure: "BCI width"
      },
      aggregation: {
        function: NumericAggregationFunctionOptions.mean,
        measure: "mean confidence"
      }
    }
  }
};
