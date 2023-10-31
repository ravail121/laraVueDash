<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Http\Requests\CompanyRequest;
use App\Mail\NewCompanyEmail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;


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
        Mail::to($company->email)->send(new NewCompanyEmail($company));

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