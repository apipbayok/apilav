<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($tipe)
    {
        $data=User::getUsers($tipe);
        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreUserRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);

        return response(new UserResource($user), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\User $user
     * @return UserResource
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateUserRequest $request
     * @param \App\Models\User $user
     * @return UserResource
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        $user->update($data);

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response("", 204);
    }

    public function getKorKecdt($id){
        $data=User::getkorcamqr($id);
        return response()->json($data);
    }

    public function getKorDesdt($id){
        $data=User::getkordesqr($id);
        return response()->json($data);
    }
    public function getKorrwdt($kecid,$desaid,$norw){
        $data=User::getkorrwqr($kecid,$desaid,$norw);
        return response()->json($data);
    }

    public function getStruk(){
        $data=User::getStrukturData();
        return response()->json($data);
    }
}
