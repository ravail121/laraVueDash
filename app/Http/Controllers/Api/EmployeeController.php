<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Http\Requests\EmployeeRequest;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::paginate(10);
        return response()->json($employees);
    }

    public function store(EmployeeRequest $request)
    {
        $data = $request->validated();
        
        // Handle any validation, file uploads, or other processing as needed
        // ...

        $employee = Employee::create($data);

        return response()->json($employee, 201);
    }

    public function show(Employee $employee)
    {
        return response()->json($employee);
    }

    public function update(EmployeeRequest $request, Employee $employee)
    {
        $data = $request->validated();
        
        // Handle any validation, file uploads, or other processing as needed
        // ...

        $employee->update($data);

        return response()->json($employee);
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();

        return response()->json(['message' => 'Employee deleted successfully']);
    }
}