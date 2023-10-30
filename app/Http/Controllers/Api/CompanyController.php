<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Http\Requests\CompanyRequest;

class CompanyController extends Controller
{
    public function index()
    {
        $companies = Company::paginate(10);
        return response()->json($companies);
    }

    public function store(CompanyRequest $request)
    {
        $data = $request->validated();
        if ($request->hasFile('logo')) {
            $filename = $request->file('logo')->getClientOriginalName();
            $request->file('logo')->storeAs('public/logos', $filename);
            $data['logo'] = $filename;
        }
        
        $company = Company::create($data);

        return response()->json($company, 201);
    }

    public function show(Company $company)
    {
        return response()->json($company);
    }

    public function update(CompanyRequest $request, Company $company)
    {
        $data = $request->validated();
        
        // Handle logo update and storage if needed
        if ($request->hasFile('logo')) {
            $filename = $request->file('logo')->getClientOriginalName();
            $request->file('logo')->storeAs('public/logos', $filename);
            $data['logo'] = $filename;
        }
        
        $company->update($data);

        return response()->json($company);
    }

    public function destroy(Company $company)
    {
        $company->delete();

        return response()->json(['message' => 'Company deleted successfully']);
    }
}