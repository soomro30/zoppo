var hasRun = false;
function runScripts(pos) {
  // Only run first time
  if (hasRun) return;

  var options = {
    contentType: 'html',
    strings: [
`
<span class="g">// Spawn Players</span><br>
<span class="b">private void</span> SpawnPlayers(<span class="lg">NetPeer</span> peer, int localPlayers)<br>
{<br>
    <span class="g">// Copy the list of all spawns</span><br>
    <span class="lg">List</span><<span class="lg">Transform</span>> spawnList = listSpawnT;<br>
<br>
    <span class="g">// Iterate spawn for each local player</span><br>
    <span class="p">for</span>(int i = 0; i < localPlayers; i++)<br>
    {<br>
        <span class="g">// Get a random spawn point</span><br>
        <span class="lg">Transform</span> spawnPoint = spawnList[UnityEngine.Random.Range(0, listSpawnT.Count)];<br>
<br>
        <span class="g">// Remove the used spawn from the spawn list, to not spawn in same position twice</span><br>
        spawnList.Remove(spawnPoint);<br>
<br>
        <span class="g">// Instantiate NetObject on server and add to dictionary of NetObjects</span><br>
        dictNetObjects.Add(netObjectID, InstantateNetObject(ObjectType.player, spawnPoint, dictNetPlayers[peer.Id]));<br>
<br>
        <span class="g">// Add this new NetObjects ID to the owning players list of NetObjects</span><br>
        dictNetPlayers[peer.Id].netObjectIDs.Add(netObjectID);<br>
<br>
        Debug.Log("dictNetObjects: " + dictNetObjects.Count + " | dictNetPlayers: " + dictNetPlayers.Count + " | netObjectID: " + netObjectID);<br>
        Debug.Log("dictNetPlayers[peer.Id].netObjectIDs: " + dictNetPlayers[peer.Id].netObjectIDs.Count);<br>
<br>
        <span class="g">// Sync this NetObject to owner and proxy NetPlayers</span><br>
        <span class="p">foreach</span>(<span class="lg">NetPlayer</span> np <span class="p">in</span> dictNetPlayers.Values)<br>
        {<br>
            <span class="lg">RPCSpawnNetObject</span> rpc = new <span class="lg">RPCSpawnNetObject</span>();<br>
            rpc.objectType = ObjectType.player;<br>
            rpc.pos = Pack.Vector3(spawnPoint.position);<br>
            rpc.rot = Pack.Quaternion(spawnPoint.rotation);<br>
            rpc.netID = netObjectID;<br>
<br>
            <span class="g">// Sync to Owner</span><br>
            <span class="p">if</span> (np.netPeer == peer)<br>
            {<br>
                rpc.receiverIsOwner = true;<br>
            }<br>
            <span class="p">else</span> <span class="g">// Sync to proxy</span><br>
            {<br>
                rpc.receiverIsOwner = false;<br>
               }<br>
<br>
               <span class="g">// Send spawn RPC to client</span><br>
               np.netPeer.Send(netPacketProcessor.Write(rpc), DeliveryMethod.ReliableOrdered);<br>
           }<br>
<br>
           <span class="g">// Increment NetID</span><br>
           netObjectID++;<br>
       }<br>
   }<br>
`
      ],
    typeSpeed: 20
  }

  var typed = new Typed("#das_terminal", options);
}

runScripts(0);
