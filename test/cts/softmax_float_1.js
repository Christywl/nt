describe('CTS / Softmax float 1 test', function() {
  const assert = chai.assert;
  const nn = navigator.ml.getNeuralNetworkContext();

  it('check result example 1', async function() {
    var model = await nn.createModel();
    var operandIndex = 0;

    let input_value = [1.0, 2.0, 10.0, 20.0];
    let output_expect = [0.25, 0.25, 0.25, 0.25];

    var type1 = {type: nn.FLOAT32, dimensions: [1e-06]};
    var type1_length = product(type1.dimensions);
    var type0 = {type: nn.TENSOR_FLOAT32, dimensions: [1, 4]};
    var type0_length = product(type0.dimensions);

    var input = operandIndex++;
    model.addOperand(type0);
    var beta = operandIndex++;
    model.addOperand(type1);
    var output = operandIndex++;
    model.addOperand(type0);

    model.setOperandValue(beta, new Float32Array([1e-06]));
    model.addOperation(nn.SOFTMAX, [input, beta], [output]);

    model.identifyInputsAndOutputs([input], [output]);
    await model.finish();

    let compilation = await model.createCompilation();
    compilation.setPreference(nn.PREFER_FAST_SINGLE_ANSWER);
    await compilation.finish();

    let execution = await compilation.createExecution();

    let input_input = new Float32Array(input_value);
    execution.setInput(0, input_input);

    let output_output = new Float32Array(type0_length);
    execution.setOutput(0, output_output);

    await execution.startCompute();

    for (let i = 0; i < type0_length; ++i) {
      assert.isTrue(almostEqual(output_output[i], output_expect[i]));
    }
  });
});