<?php

namespace App\Http\Controllers;

use App\Models\Personnel;
use App\Models\Address;
use App\Models\Phone;
use App\Models\City;
use App\Models\District;
use App\Models\Address_Type;
use Illuminate\Http\Request;

class PersonnelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $getPersonnel = Personnel::get();
        $city = City::select('city_name as label', 'id as value')->get();
        $district = District::select('district_name as label', 'id as value', 'city_id')->get();
        $address_type = Address_Type::select('address_type as label', 'id as value')->get();
        $address_type_id = Address::select('address_type_id as label', 'id as value')->get();

        return response()->json([$getPersonnel,$city,$district,$address_type,$address_type_id]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $address = Address::insertGetId([
            'city_id'=>$request->city,
            'district_id'=>$request->district,
            'address_type_id'=>$request->address_type,
        ]);

        $personnel = Personnel::insertGetId([
            'personnel_name'=>$request->personnel_name,
            'personnel_surname'=>$request->personnel_surname,
            'personnel_birthday'=>$request->personnel_birthday,
            'personnel_birthplace'=>$request->personnel_birthplace,
            'address_id'=>$address,
        ]);

      foreach($request->phone as $item){
          $phone= Phone::insertGetId([
              'phone'=>$item['phone'],
              'address_id'=>$address
          ]);
      }

        return response()->json([$address, $personnel, $phone]);
    }

    public function add(Request $request){
        $address_type = Address_Type::create([
            'address_type'=>$request->address_type
        ]);
        return response()->json($address_type);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Personnel  $personnel
     * @return \Illuminate\Http\Response
     */
    public function show(Personnel $personnel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Personnel  $personnel
     * @return \Illuminate\Http\Response
     */
    public function edit(Personnel $personnel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Personnel  $personnel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Personnel $personnel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Personnel  $personnel
     * @return \Illuminate\Http\Response
     */
    public function destroy(Personnel $personnel)
    {
        //
    }
}
