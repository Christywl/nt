#
# Copyright (C) 2018 The Android Open Source Project
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#


model = Model()
i1 = Input("input", "TENSOR_FLOAT32", "{4, 2, 2, 1}")
block = Parameter("block_size", "TENSOR_INT32", "{2}", [2, 2])
output = Output("output", "TENSOR_FLOAT32", "{1, 4, 4, 1}")

model = model.Operation("BATCH_TO_SPACE_ND", i1, block).To(output)
model = model.RelaxedExecution(True)

# Example 1. Input in operand 0,
input0 = {i1: # input 0
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}

output0 = {output: # output 0
           [1, 5, 2, 6, 9, 13, 10, 14, 3, 7, 4, 8, 11, 15, 12, 16]}

# Instantiate an example
Example((input0, output0))
