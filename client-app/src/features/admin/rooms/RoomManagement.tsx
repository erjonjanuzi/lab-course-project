import { observer } from 'mobx-react-lite';
import { Button, Header, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AddRoom from './AddRoom';
import React, { useEffect } from 'react';
import ViewRoom from './ViewRoom';
import Breadcrumbs from '../../patients/my-profile/Breadcrumbs';

export default observer(function RoomManagement(){
    const {roomStore,departmentStore,patientStore,modalStore}=useStore();
    const {rooms,roomRegistry,loadRooms,deleteRoom} = roomStore
    const {departments,departmentRegistry,loadDepartments,deleteDepartment} = departmentStore
    const { patients, patientRegistry, GresaLoadPatients,selectedPatient} = patientStore;

    
   useEffect(() => {
       if(roomRegistry.size<=0)loadRooms();
   } ,[roomRegistry.size,loadRooms])

   useEffect(() => {
    if(departmentRegistry.size<=0)loadDepartments();
} ,[departmentRegistry.size,loadDepartments])

useEffect(() => {
    if (patientRegistry.size <= 1) GresaLoadPatients();
}, [patientRegistry.size, GresaLoadPatients])
 
    
    return (
        <>
        <Breadcrumbs> </Breadcrumbs>
        <Segment>
            <Button content='New Room' onClick={() => modalStore.openModal(<AddRoom/>)}/>
            <Header content='Room Management' />
          
            <Table textAlign="center">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>RoomNo</Table.HeaderCell>
                        <Table.HeaderCell>Room Type</Table.HeaderCell>
                        <Table.HeaderCell>Floor</Table.HeaderCell>
                        <Table.HeaderCell>Department</Table.HeaderCell>
                        <Table.HeaderCell>Patient</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                    
                </Table.Header> 
                <Table.Body >
                    {rooms.map(room=>(
                                <Table.Row key={room.id}>
                                    <Table.Cell>{room.roomNo}</Table.Cell>
                                    <Table.Cell>{room.roomType}</Table.Cell>
                                    <Table.Cell>{room.floor}</Table.Cell>
                                    <Table.Cell>{room.department}</Table.Cell>
                                    <Table.Cell>{room.patient}</Table.Cell>

                                    <Table.Cell>
                                   <Button content='Edit' icon='edit' basic color='youtube'
                                    onClick={() => modalStore.openModal(<ViewRoom id={room.id}/>)}
                                    />
                                    <Button icon='delete' color='red'
                                     onClick={()=>deleteRoom(room.id)}
                                    /> 
                                    </Table.Cell> 
                                <Table.Row/>  
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Segment>
        </>
    )
})