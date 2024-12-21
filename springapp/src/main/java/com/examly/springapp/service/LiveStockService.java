package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.model.LiveStock;

public interface LiveStockService {
    public LiveStock addLiveStock(LiveStock liveStock, int userId);
    public List<LiveStock> getLiveStockByUserId(int userId);
    public List<LiveStock> getAllLiveStock();
    public Optional<LiveStock> getLiveStockById(int id);
    public LiveStock updateLiveStock(int id, LiveStock updatedLiveStock,int userId);
    public boolean deleteLiveStock(int id);
}
